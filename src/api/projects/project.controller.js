import {
  createProjectService,
  getAllProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
} from './project.service.js';
import projectValidator from '../../validator/projects/index.js';

const createProjectController = async (req, res, next) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    projectValidator.validateProjectPayload({ name, description, startDate, endDate });

    const projectId = await createProjectService({
      name,
      description,
      startDate,
      endDate,
    });

    res.status(201).json({
      status: 'success',
      message: 'Project created successfully',
      data: {
        projectId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllProjectsController = async (req, res, next) => {
  try {
    const projects = await getAllProjectsService();

    res.status(200).json({
      status: 'success',
      message: 'Projects retrieved successfully',
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

const getProjectByIdController = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await getProjectByIdService(projectId);

    res.status(200).json({
      status: 'success',
      message: 'Project retrieved successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const updateProjectController = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { name, description, startDate, endDate } = req.body;
    projectValidator.validateProjectPayload({ name, description, startDate, endDate });

    await updateProjectService({
      projectId,
      name,
      description,
      startDate,
      endDate,
    });

    res.status(200).json({
      status: 'success',
      message: 'Project updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

const deleteProjectController = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    await deleteProjectService(projectId);

    res.status(200).json({
      status: 'success',
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController,
};
