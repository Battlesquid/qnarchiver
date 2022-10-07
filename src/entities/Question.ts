import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { QuestionData } from "..";

@Entity({ tableName: "Questions" })
export class Question implements QuestionData {
    @PrimaryKey()
    id!: string

    @Property()
    url!: string
    
    @Property()
    author!: string

    @Property()
    program!: string

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
    timestamp_ms!: number

    @Property()
    answered!: boolean

    @Property()
    tags!: string[]
}