import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
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

export const UserSchema = SchemaFactory.createForClass(User);