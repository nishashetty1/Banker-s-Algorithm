# Banker's Algorithm Simulator

This web application made using AI simulates the Banker's Algorithm for deadlock avoidance. It allows users to input data about processes and resources, then runs the Banker's Algorithm to determine whether the system is in a safe state and if so, what the safe sequences are.

## Features

- **Input Process and Resource Information**: The user can specify the number of processes, resources, and their available, maximum, and allocated resources.
- **Run Banker's Algorithm**: Based on the inputs, the algorithm calculates whether the system is in a safe state.
- **Safe Sequences**: Displays the possible safe sequences if the system is in a safe state.
- **Need Matrix**: Displays the need matrix showing the remaining resources required by each process.

## What is the Banker's Algorithm?

The Banker's Algorithm is used for deadlock avoidance in a system with multiple processes and resources. It works by checking whether the system is in a safe state by calculating the possibility of processes completing without causing deadlock. If a process can complete without causing a deadlock, it releases the resources it holds, allowing other processes to proceed.

### Key Definitions:
- **Safe State**: A state where all processes can complete without causing deadlock.
- **Unsafe State**: A state where at least one process cannot complete, potentially causing deadlock.
- **Safe Sequence**: A sequence of processes where each process can safely execute and release its resources.

## How to Use

1. **Enter the number of processes and resources**: You will be prompted to enter how many processes and resources your system has.
2. **Enter Available Resources**: Input the number of available resources for each resource type.
3. **Enter Maximum Resources for Each Process**: For each process, specify the maximum resources it might need.
4. **Enter Allocated Resources for Each Process**: For each process, specify the resources it is currently holding.
5. **Run the Algorithm**: Click the "Run Banker's Algorithm" button to check if the system is in a safe state and to view the safe sequences, if any.

### Example:

1. **Number of Processes**: 3
2. **Number of Resources**: 3
3. **Available Resources**: 3, 3, 2
4. **Maximum Resources for each Process**:
    - Process 1: 3, 2, 2
    - Process 2: 6, 1, 3
    - Process 3: 3, 3, 3
5. **Allocated Resources for each Process**:
    - Process 1: 1, 1, 1
    - Process 2: 3, 2, 2
    - Process 3: 2, 1, 1

Clicking "Run Banker's Algorithm" will show whether the system is in a safe state and display the safe sequences if applicable.
