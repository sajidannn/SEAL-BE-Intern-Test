import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from './project.repository.js';
import NotFoundError from '../../exception/NotFoundError.js';
import InvariantError from '../../exception/InvariantError.js';
import { nanoid } from 'nanoid';

const createProjectService = async ({ name, description, startDate, endDate }) => {
  const id = `project-${nanoid(16)}`;

  const projectId = await createProject({
    id,
    name,
    description,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
  });

  if (!projectId) {
    throw new InvariantError('Failed to create project');
  }

  return projectId;
};

const getAllProjectsService = async () => {
  const projects = await getAllProjects();

  if (!projects || projects.length === 0) {
    throw new NotFoundError('No projects found');
  }

  return projects;
};

const getProjectByIdService = async (projectId) => {
  const project = await getProjectById(projectId);

  if (!project) {
    throw new NotFoundError('Project not found');
  }

  return project;
};

const updateProjectService = async ({ projectId, name, description, startDate, endDate }) => {
  const project = await getProjectByIdService(projectId);

  if (!project) {
    throw new NotFoundError('Project not found');
  }

  const updatedProjectId = await updateProject({
    id: projectId,
    name,
    description,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
  });

  if (!updatedProjectId) {
    throw new InvariantError('Failed to update project');
  }

  return updatedProjectId;
};

const deleteProjectService = async (projectId) => {
  const project = await getProjectByIdService(projectId);

  if (!project) {
    throw new NotFoundError('Project not found');
  }

  await deleteProject(projectId);
};

export {
  createProjectService,
  getAllProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
};
