/***
 * @Description: 用户实体
 * @author chenjie
 */
export class User {
  id: number;		      // 用户id
  username: string;	  // 用户名
  password: string;	  // 原密码
  rePassword: string;   // 新密码,不存与数据表
  role: string;			  // 用户角色
  roleId: number;
}
