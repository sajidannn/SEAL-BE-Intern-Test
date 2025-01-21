import userValidator from "../../validator/users/index.js";
import { createUserService } from "./user.service.js";

const createUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const avatar = req.file;

    userValidator.validateUserPayload({ name, email, password, avatar })

    const userId = await createUserService({
      name,
      email,
      password,
      avatar,
    });

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: { id: userId },
    });
  } catch (error) {
    next(error);
  }
};

export { createUserController };