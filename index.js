import axios from 'axios';
import dotenv from 'dotenv';

const accessToken = dotenv.config().parsed.ACCESS_TOKEN;
const apiUrl = dotenv.config().parsed.API_URL;

// Targe Project Id
const projectId = '87'
// Runners Ids
const runnersIds = [2, 3, 4]

// Create Project Function
// const groupName = 'bet';
// const projectName = 'test-123';
// async function createProject() {
//   try {
//     const response = await axios.post(`${apiUrl}/projects`, {
//       name: projectName,
//       path: projectName.toLowerCase(),
//       namespace_id: groupName
//     }, {
//       headers: {
//         'PRIVATE-TOKEN': accessToken
//       }
//     });

//     console.log('Project created successfully:', response.data);
//   } catch (error) {
//     console.error('Error creating the project:', error.response);
//   }
// }

const createBranch = async (branchName, sourceBranch) => {
  try {
    const response = await axios.post(
      `${apiUrl}/projects/${encodeURIComponent(projectId)}/repository/branches`,
      {
        branch: branchName,
        ref: sourceBranch
      },
      {
        headers: {
          'PRIVATE-TOKEN': accessToken
        }
      }
    );
    console.log(`Branch ${branchName} created successfully:`, response.data);
  } catch (error) {
    console.error(`Error creating branch ${branchName}:`, error.response ? error.response.data : error.message);
  }
}

const protectBranch = async (branchName, pushAccessLevel, mergeAccessLevel) => {
  try {
    const response = await axios.post(
      `${apiUrl}/projects/${encodeURIComponent(projectId)}/protected_branches`,
      {
        name: branchName,
        push_access_level: pushAccessLevel,
        merge_access_level: mergeAccessLevel
      },
      {
        headers: {
          'PRIVATE-TOKEN': accessToken
        }
      }
    );
    console.log(`Branch ${branchName} protected successfully:`, response.data);
  } catch (error) {
    console.error(`Error protecting branch ${branchName}:`, error.response ? error.response.data : error.message);
  }
}

const updateProjectSettings = async () =>{
  try {
    const response = await axios.put(
      `${apiUrl}/projects/${encodeURIComponent(projectId)}`,
      {
        only_allow_merge_if_pipeline_succeeds: true,
        only_allow_merge_if_all_discussions_are_resolved: true,
        auto_devops_enabled: false // disabled auto devops
      },
      {
        headers: {
          'PRIVATE-TOKEN': accessToken
        }
      }
    );
    console.log('Merge request settings updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating merge request settings:', error.response ? error.response.data : error.message);
  }
}

const listRunners = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/runners/all`,
      {
        headers: {
          'PRIVATE-TOKEN': accessToken
        }
      }
    );
    console.log('Available Runners:', response.data);
  } catch (error) {
    console.error('Error fetching runners:', error.response ? error.response.data : error.message);
  }
}

const enableRunnerForProject = async (projectId, runnerId) => {
  try {
    const response = await axios.post(
      `${apiUrl}/projects/${encodeURIComponent(projectId)}/runners`,
      {
        runner_id: runnerId
      },
      {
        headers: {
          'PRIVATE-TOKEN': accessToken
        }
      }
    );
    console.log(`Runner ${runnerId} enabled for project ${projectId}:`, response.data);
  } catch (error) {
    console.error(`Error enabling runner ${runnerId} for project ${projectId}:`, error.response ? error.response.data : error.message);
  }
}

// createBranch('dev', 'main');
// createBranch('uat', 'main');

// protectBranch('main', 40, 40); // Maintainers
// protectBranch('uat', 40, 30);  // Maintainers for push, Developers + Maintainers for merge
// protectBranch('dev', 40, 30);

// updateProjectSettings();

// runnersIds.forEach(runnerId => enableRunnerForProject(projectId, runnerId));


listRunners();
