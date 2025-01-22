import { loginUserService } from "./auth.service.js";

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUserService(email, password);

    res
      .cookie('access_token', user.accessToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        status: 'success',
        message: 'login user successfully',
        data: {
          access_token: user.accessToken,
          userId: user.userId,
        },
      });
  } catch (error) {
    next(error);
  }
};

const logoutUserController = async (req, res, next) => {
  try {
    res
      .clearCookie('access_token', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })
      .status(200)
      .json({
        status: 'success',
        message: 'Logout user successfully',
      });
  } catch (error) {
    next(error);
  }
};


export { loginUserController, logoutUserController };