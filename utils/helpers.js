const {Project} = require('../models');

async function getProjectsByUser(id){
    const projectData = await Project.findAll({where: {
    user_id: id
    }});

    const projects = projectData.map(project => project.get({plain: true}));

    return projects;
}

module.exports = getProjectsByUser;