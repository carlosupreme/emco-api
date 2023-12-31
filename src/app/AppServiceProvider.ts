import { LoginUser } from "../auth/application/LoginUser";
import { RegisterUser } from "../auth/application/RegisterUser";
import { JWTProvider } from "../auth/domain/JWTProvider";
import { UserRepository } from "../auth/domain/UserRepository";
import { AuthController } from "../auth/infrastructure/AuthController";
import { JsonWebTokenProvider } from "../auth/infrastructure/JsonWebTokenProvider";
import { MySQLUserRepository } from "../auth/infrastructure/MySQLUserRepository";
import SessionValidator from "../auth/infrastructure/Session";
import { MySQLConnection } from "../shared/infrastructure/MySQLConnection";

export class AppServiceProvider {
  private static _userRepository: UserRepository;
  private static _authController: AuthController;
  private static _jwtProvider: JWTProvider;
  private static _sessionValidator: SessionValidator;

  private static userRepository(): UserRepository {
    if (null == AppServiceProvider._userRepository) {
      AppServiceProvider._userRepository = new MySQLUserRepository(
        MySQLConnection.getInstance()
      );
    }

    return AppServiceProvider._userRepository;
  }

  private static jwtProvider(): JWTProvider {
    if (null == AppServiceProvider._jwtProvider) {
      AppServiceProvider._jwtProvider = new JsonWebTokenProvider();
    }

    return AppServiceProvider._jwtProvider;
  }

  static sessionValidator(): SessionValidator {
    if (null == AppServiceProvider._sessionValidator) {
      AppServiceProvider._sessionValidator = new SessionValidator(
        AppServiceProvider.jwtProvider()
      );
    }

    return AppServiceProvider._sessionValidator;
  }

  static authController(): AuthController {
    if (null == AppServiceProvider._authController) {
      AppServiceProvider._authController = new AuthController(
        new LoginUser(
          AppServiceProvider.userRepository(),
          AppServiceProvider.jwtProvider()
        ),
        new RegisterUser(
          AppServiceProvider.userRepository(),
          AppServiceProvider.jwtProvider()
        )
      );
    }

    return AppServiceProvider._authController;
  }
}
