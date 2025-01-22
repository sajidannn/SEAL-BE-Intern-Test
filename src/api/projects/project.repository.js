import prisma from '../../database/index.js';

const createProject = async ({ id, name, description, startDate, endDate }) => {
  const project = await prisma.project.create({
    data: {
      id,
      name,
      description,
      startDate,
      endDate,
    },
  });

  return project.id;
};

const getAllProjects = async () => {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      startDate: true,
      endDate: true,
    },
  });

  return projects;
};

const getProjectById = async (id) => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      tasks: {
        select: {
          id: true,
          title: true,
          status: true,
          dueDate: true,
        }
      }
    }
  });

  return project;
};

const updateProject = async ({ id, name, description, startDate, endDate }) => {
  const updatedProject = await prisma.project.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      startDate,
      endDate,
    },
  });

  return updatedProject.id;
};

const deleteProject = async (id) => {
  const deletedProject = await prisma.project.delete({
    where: {
      id,
    },
  });

  return deletedProject.id;
};

export {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
