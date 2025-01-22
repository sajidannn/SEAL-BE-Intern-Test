import userValidator from "../../validator/users/index.js";
import {
  createUserService,
  getUserByIdService,
  getAllUsersService,
  updateUserService,
  editPasswordService,
  deleteUserService,
} from "./user.service.js";

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

const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsersService();

    res.status(200).json({
      status: 'success',
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const avatar = req.file;

    userValidator.validateUserUpdatePayload({ name, avatar });

    await updateUserService({ id, name, avatar });

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

const editPasswordController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password, newPassword } = req.body;

    await editPasswordService({ id, password, newPassword });

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteUserService(id);

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export {
  createUserController,
  getUserByIdController,
  getAllUsersController,
  updateUserController,
  editPasswordController,
  deleteUserController,
};