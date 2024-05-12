import fs from 'fs';
import path from 'path';

// Function to write data to a JSON file asynchronously
const writeToFile = (folderName, fileName, newData) => {
  const filePath = path.join(__appdir, folderName, fileName);

  // Read the existing JSON content from the file, if it exists
  fs.readFile(filePath, 'utf8', (readError, existingData) => {
    if (readError && readError.code !== 'ENOENT') {
      console.error('Error reading file:', readError);
      return;
    }

    let dataArray = [];
    if (existingData) {
      // Parse the existing JSON content into an array
      try {
        dataArray = JSON.parse(existingData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return;
      }
    }
    // Append the new data to the array
    dataArray.push(newData);

    // Write the updated array back to the file
    fs.writeFile(filePath, JSON.stringify(dataArray, null, 2), (writeError) => {
      if (writeError) {
        console.error('Error writing file:', writeError);
      } else {
        console.log('Data successfully written to file.');
      }
    });
  });
};

export default writeToFile;
