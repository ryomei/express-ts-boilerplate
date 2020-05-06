import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  BeforeSave
} from 'sequelize-typescript'
import bcrypt from 'bcrypt'

export interface ILogin {
     id?: number | null
     passwordHash?: string
     loginName: string
 }

 @Table({
   tableName: 'logins',
   timestamps: true
 })
export default class Login extends Model<Login> implements ILogin {
    @PrimaryKey
    @AutoIncrement
    @NotEmpty
    @Column
    public id?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    public loginName!: string

    @NotEmpty
    @Column
    public passwordHash!: string

    public password?: string

    @BeforeSave
    static async hashPassword (instance: Login) {
      if (instance.password) {
        instance.passwordHash = await bcrypt.hash(instance.password, 10)
      }
    }
}
