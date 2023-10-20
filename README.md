<!-- PROJECT LOGO -->
<a name="readme-top"></a>
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://i.ibb.co/HnfJK9t/Collectiv-Logo.png" alt="Logo">
  </a>
  <p align="center">
     <b>Your Sanctuary for Community Events!</b>
    <br />
    <a href="https://collectiv-fe-display.vercel.app/"><strong>Check out the Web App »</strong></a>
  </p>
    <img src="https://github.com/The-Mud-Koalas/collectiv-fe-web/assets/70852167/f602728c-e2aa-4f46-8479-f7b4160f0b3c"></img>
  <br/>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-collectiv">About Collectiv</a>
      <ul>
        <li><a href="#the-problem">The Problem</a></li>
        <li><a href="#our-vision">Our Vision</a></li>
        <li><a href="#our-mission">Our Mission</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#environment-setup">Environment Setup</a></li>
      </ul>
    </li>
    <li><a href="#running-the-project">Running the project</a></li>
    <li><a href="#conventions">Conventions</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About Collectiv
### The Problem:
Active engagement of community members to initiatives and/or ongoing projects is an essential component of a healthy communal space. However, there exists several obstacles that can hinder this, especially in a youth-dominated campus community. Lack of awareness of suitable opportunities to contribute is an important factor that discourages youth from participating in these events (Volunteering Queensland, 2021). Furthermore, inability to connect people affiliated to a common cause deprives the members of motivation to participate (Culp III & Schwartz, 1999). Therefore, it is necessary to motivate these members to  contribute more proactively to their communal space through informing members of any initiatives and/or projects and providing a medium for community members to connect with others sharing a common interest.

### Our Vision:

***Create a healthy community where everyone feels inspired to contribute, where diversity is celebrated, and where shared interests unite us in making every communal space a better place for all.***

### Our Mission:

***Cultivate an interactive and self-sustaining community around a specific shared communal space which is inclusive and allows people with diverse perspectives to contribute.***

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]
* [![Tailwind][Tailwind-css]][Tailwind-css-url]
* [![RHF][React-hook-form]][React-hook-form-url]
* [![Firebase][Firebase]][Firebase-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

You can choose to fork or clone this repository before you get started with development. The following demonstrates how to do the latter:
  ```
  git clone https://github.com/The-Mud-Koalas/collectiv-fe-display
  ```
This will automatically create a `/collectiv-fe-display` directory which contains the contents of this repository. You can then open that directory using the IDE of your choice i.e Visual Studio Code.

### Environment Setup

1. Once you have opened the project folder in your preferred IDE, open up a command propmt and run the following commands in the root directory:
  ```
  npm install
  ```
  or with any package manager of your choice (`yarn`, `pnpm`, etc.). This will install all the necessary packages for the project to run.

2. Since this project uses authentication provided by [Firebase](https://firebase.google.com) and the [Google Maps API](https://developers.google.com/maps), we need to set some environment variables. Create a `.env.local` file in the root directory of your project and set the following values:

   ```
    NEXT_PUBLIC_FIREBASE_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    NEXT_PUBLIC_FIREBASE_MESSEGING_SENDER_ID=XXXXXXXXXX
    NEXT_PUBLIC_FIREBASE_APP_ID=1:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    
    NEXT_PUBLIC_BACKEND_URL="https://XXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    NEXT_PUBLIC_FRONTEND_URL="https://XXXXXXXXXXXXXXXXXXXXXXX"
    
    NEXT_PUBLIC_MAPS_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXX
    ```
    Learn more about [Firebase Authentication](https://firebase.google.com/docs/auth/) and how to get the [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
<p align="right">(<a href="#readme-top">back to top</a>)</p>

>Note that `NEXT_PUBLIC_BACKEND_URL` should be the *url* of the [Collectiv Backend Application](https://github.com/The-Mud-Koalas/collectiv-be), and to run that locally, visit the repository for instructions. `NEXT_PUBLIC_FRONTEND_URL` is just the *url* of your local frontend server during development, in most cases its `http://localhost:3000`

### Running the project
If you followed all the environment setup steps correctly you should be able to run the application by running the following command:
```
npm run dev
```
or 
```
yarn dev / pnpm dev
```
If you don't have any [Next.js](https://nextjs.org) servers running, the server should start at `http://localhost:3000`

<!-- USAGE EXAMPLES -->
### Conventions
* All Components should be placed under the `/components` directory.
* The `/features` directory is treated as a *composed* components directory which builds into a feature.
* Shared components that are reusable and decoupled from specific prop requirements are to be placed under the `shared` directory.
* Since this project uses [Typescriot](https://www.typescriptlang.org/), we defined all types globally in the `types` directory.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
### Contact

The Mud Koalas  - themudkoalas@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React-query]: https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white
[React-query-url]: https://tanstack.com/query/v3/
[Django]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white
[Django-url]: https://www.djangoproject.com/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Expo]: https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37
[Expo-url]:https://expo.dev/
[React-native]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-native-url]: https://reactnative.dev/
[React-hook-form]: https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white
[React-hook-form-url]: https://react-hook-form.com/
[Tailwind-css]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-css-url]: https://tailwindcss.com/
[Huggingface]: https://huggingface.co/datasets/huggingface/badges/resolve/main/powered-by-huggingface-light.svg
[Huggingface-url]: https://huggingface.co/
[Firebase]: https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white
[Firebase-url]: https://firebase.google.com/
