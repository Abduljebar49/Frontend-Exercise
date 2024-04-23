# Frontend-Exercise Project

Welcome to our React project! This project is built with TypeScript and React for creating interactive web applications.

## Installation

Follow these steps to get the project up and running on your local machine:

1. Clone the repository:
   ```
   git clone https://github.com/Abduljebar49/Frontend-Exercise.git
   ```

2. Navigate to the project directory:
   ```
   cd Frontend-Exercise
   ```

3. Install dependencies using npm:
   ```
   npm install
   ```

## Configuration

To use Google Maps features in the project, you need to add your Google Maps API key to the configuration. Follow these steps:

1. Create a `secrets.ts` file in the `src/config` directory if it doesn't already exist.

2. Open `secrets.ts` and change the following code:
   ```typescript
   const GOOGLE_MAP_API = "ADD_YOUR_API_HERE";

   ```

   Replace `'ADD_YOUR_API_HERE'` with your actual Google Maps API key.

## How to Run

Once you have completed the installation and configuration steps, you can run the project locally. Use the following command:

```
npm start
```

This command starts the development server and opens the project in your default web browser. Any changes you make to the source code will be hot-reloaded, allowing for a smooth development experience.

## Build for Production

To build the project for production, use the following command:

```
npm run build
```

This command creates a production-ready build of the project in the `build` directory. You can deploy this build to a web server or hosting platform of your choice.

## Contributing

We welcome contributions to this project! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README file based on your project's specific requirements and structure.