import { Injectable, ConflictException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async register(dto: RegisterDto) {
		const existing = await this.userService.findByEmail(dto.email);
		if (existing) throw new ConflictException("Email already registered");
		const hash = await bcrypt.hash(dto.password, 10);
		return this.userService.create({ ...dto, password: hash });
	}
}
