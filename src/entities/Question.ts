import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { QuestionData } from "..";

@Entity({ tableName: "Questions" })
export class Question implements QuestionData {
    @PrimaryKey()
    id!: string

    @Property()
    author!: string

    @Property()
    category!: string

    @Property()
    title!: string

    @Property()
    question!: string

    @Property()
    answer!: string

    @Property()
    season!: string

    @Property()
    timestamp!: string

    @Property()
    answered!: boolean

    @Property()
    tags!: string[]
}