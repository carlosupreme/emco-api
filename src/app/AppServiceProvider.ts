import { AuthenticateUser } from "../auth/application/AuthenticateUser";
import { RegisterUser } from "../auth/application/RegisterUser";
import { UserRepository } from "../auth/domain/UserRepository";
import { AuthController } from "../auth/infrastructure/AuthController";
import { MySQLUserRepository } from "../auth/infrastructure/MySQLUserRepository";
import { MySQLConnection } from "../shared/infrastructure/MySQLConnection";

export class AppServiceProvider {
  private static _userRepository: UserRepository;
  private static _authController: AuthController;

  private static userRepository(): UserRepository {
    if (null == AppServiceProvider._userRepository) {
      AppServiceProvider._userRepository = new MySQLUserRepository(
        MySQLConnection.getInstance()
      );
    }

    return AppServiceProvider._userRepository;
  }

  static authController(): AuthController {
    if (null == AppServiceProvider._authController) {
      this._authController = new AuthController(
        new AuthenticateUser(this.userRepository()),
        new RegisterUser(this.userRepository())
      );
    }

    return this._authController;
  }
}
