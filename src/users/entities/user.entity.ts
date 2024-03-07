import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Prisma } from "@prisma/client";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop()
    username: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop({ default: false })
    isAdmin: boolean;

}

export type PrismaUser = Prisma.UserCreateInput;

export const UserSchema = SchemaFactory.createForClass(User);