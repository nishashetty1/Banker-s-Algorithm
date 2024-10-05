document.getElementById("setupButton").addEventListener("click", function () {
    const processCount = parseInt(document.getElementById("processCount").value);
    const resourceCount = parseInt(document.getElementById("resourceCount").value);
    
    if (isNaN(processCount) || isNaN(resourceCount) || processCount <= 0 || resourceCount <= 0) {
        alert("Please enter valid positive numbers for processes and resources.");
        return;
    }

    // Setup input fields for resources
    const processInputs = document.getElementById("processInputs");
    processInputs.innerHTML = "";
    
    for (let i = 0; i < processCount; i++) {
        processInputs.innerHTML += `<h3>Process ${i}</h3>
            <label for="maxResources${i}">Max Resources:</label>
            <input type="text" id="maxResources${i}" placeholder="Comma-separated values" required>
            <label for="allocatedResources${i}">Allocated Resources:</label>
            <input type="text" id="allocatedResources${i}" placeholder="Comma-separated values" required>`;
    }
    
    document.getElementById("inputSection").style.display = "block";
});

document.getElementById("submitButton").addEventListener("click", function () {
    const processCount = parseInt(document.getElementById("processCount").value);
    const resourceCount = parseInt(document.getElementById("resourceCount").value);
    
    const availableResources = document.getElementById("availableResources").value.split(",").map(Number);
    let maxResources = [];
    let allocatedResources = [];
    
    for (let i = 0; i < processCount; i++) {
        const max = document.getElementById(`maxResources${i}`).value.split(",").map(Number);
        const allocated = document.getElementById(`allocatedResources${i}`).value.split(",").map(Number);
        
        maxResources.push(max);
        allocatedResources.push(allocated);
    }
    
    const result = bankersAlgorithm(processCount, resourceCount, availableResources, maxResources, allocatedResources);
    displayResult(result);
});

function bankersAlgorithm(processCount, resourceCount, availableResources, maxResources, allocatedResources) {
    const finish = Array(processCount).fill(false);
    const need = [];
    
    // Calculate need matrix
    for (let i = 0; i < processCount; i++) {
        need.push(maxResources[i].map((val, index) => val - allocatedResources[i][index]));
    }

    const safeSequences = [];
    findSafeSequences(processCount, resourceCount, availableResources, maxResources, allocatedResources, need, finish, [], safeSequences);
    
    return {
        safe: safeSequences.length > 0,
        sequences: safeSequences,
        needMatrix: need
    };
}

function findSafeSequences(processCount, resourceCount, availableResources, maxResources, allocatedResources, need, finish, currentSequence, safeSequences) {
    let allFinished = true;
    for (let p = 0; p < processCount; p++) {
        if (!finish[p] && need[p].every((val, index) => val <= availableResources[index])) {
            allFinished = false;
            const newAvailable = availableResources.map((val, index) => val + allocatedResources[p][index]);
            finish[p] = true;
            currentSequence.push(`P${p}`);
            findSafeSequences(processCount, resourceCount, newAvailable, maxResources, allocatedResources, need, finish, currentSequence, safeSequences);
            finish[p] = false;
            currentSequence.pop();
        }
    }
    
    if (allFinished) {
        safeSequences.push([...currentSequence]);
    }
}

function displayResult(result) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (result.safe) {
        resultDiv.innerHTML += `<h3>System is in a safe state.</h3>`;
        resultDiv.innerHTML += `<h4>Possible Safe Sequences:</h4><ul>`;
        result.sequences.forEach(seq => {
            resultDiv.innerHTML += `<li>${seq.join(" -> ")}</li>`;
        });
        resultDiv.innerHTML += `</ul>`;
    } else {
        resultDiv.innerHTML += `<h3>System is in an unsafe state.</h3>`;
    }

    // Display Need Matrix
    let needMatrixHTML = `<h4>Need Matrix:</h4><table border="1" style="border-collapse: collapse; width: 100%;">
                            <thead><tr>`;
    for (let i = 0; i < result.needMatrix[0].length; i++) {
        needMatrixHTML += `<th>Resource ${i}</th>`;
    }
    needMatrixHTML += `</tr></thead><tbody>`;

    for (let i = 0; i < result.needMatrix.length; i++) {
        needMatrixHTML += `<tr>`;
        for (let j = 0; j < result.needMatrix[i].length; j++) {
            needMatrixHTML += `<td>${result.needMatrix[i][j]}</td>`;
        }
        needMatrixHTML += `</tr>`;
    }

    needMatrixHTML += `</tbody></table>`;
    resultDiv.innerHTML += needMatrixHTML;
}
