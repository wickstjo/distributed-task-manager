## Thesis - Frontend Application

This is one out of four repositories that cover the project created for my bachelors thesis. Briefly summarized, this project allows an Internet of Things (IoT) device to be managed indirectly via a smart contract on the Ethereum blockchain. IoT devices are able to function autonomously through a custom written middleware that interprets payloads received from the blockchain and converts them into actions. The usage of the system is streamlined through a react-based distributed frontend application.

**The projects repositories**:

| Name          | Repository    |
| ------------- |:-------------:|
| Smart Contract Backend      | [https://github.com/wickstjo/oracle-manager](https://github.com/wickstjo/oracle-manager) |
| Middleware Interpreter      | [https://github.com/wickstjo/oracle-manager](https://github.com/wickstjo/iot-manager) |
| Frontend Application        | [https://github.com/wickstjo/distributed-task-manager](https://github.com/wickstjo/distributed-task-manager)|
| Private Blockchain          | [https://github.com/wickstjo/thesis-chain](https://github.com/wickstjo/thesis-chain) |

## Content

This is the projects frontend application that exists to streamline the usage of the decentralized smart contract backend system in order to command Internet of Things to, for example, perform a task or update its middleware autonomously. The application is written in the React framework that is developed by Facebook.

**Points of Interest**:
- The application's base configuration files can be located in the **src/resources directory**.
- Mock data for Task and Oracle creation can be located in the **mock directory**.

**In a Bash Terminal**:
- Install the necessary NodeJS packages with **npm install**.
- Compile and launch the application with **npm start**.