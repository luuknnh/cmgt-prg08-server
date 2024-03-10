# cmgt-prg08-server

## Project Title

This project is a chat application that utilizes the OpenAI API to generate responses, offering an interactive and engaging user experience. It is designed to demonstrate the capabilities of AI in understanding and responding to user inputs in a chat environment.

## Getting Started

These instructions will guide you through getting a copy of the project up and running on your local machine for development and testing purposes. Follow these steps to set up your environment.

### Prerequisites

Before you begin, ensure you have the following tools installed on your system:

- **Node.js and npm**: Node.js is a runtime environment that allows you to run JavaScript on the server-side. npm is the Node.js package manager. Both are essential for developing Node.js applications. You can download and install them from [the official Node.js website](https://nodejs.org/).

### Installing

Follow these steps to get your development environment running:

1. **Clone the repository** to your local machine:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```

2. **Navigate** into the project directory:

   ```bash
   cd your-repo-name
   ```

3. **Install the project dependencies**. This will download all the necessary packages defined in the `package.json` file:

   ```bash
   npm install
   ```

4. **Create a .env file** in the root of your project and add your OpenAI API key. This file will be used to store environment variables:

   ```bash
   echo "OPENAI_API_KEY=your-api-key" > .env
   ```

   Replace `your-api-key` with your actual OpenAI API key.

5. **Start the development server**. This will launch the application on your local machine:

   ```bash
   npm run dev
   ```

   After executing this command, the application should be running and accessible at `http://localhost:3000`.

## Built With

- **Node.js** - The runtime environment used.
- **Express.js** - The web application framework.
- **OpenAI API** - Provides AI-powered responses.

## Contributing

We welcome contributions to this project! If you have suggestions to improve it or want to contribute code, please feel free to make a pull request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

- Thanks to OpenAI for providing the API used in this project.
- All contributors who have helped to build and improve this application.

## Issues

- Image Generation does not work in Vercel (The call takes to long and since Vercel only supports Express as an Serverless function it takes to long)
