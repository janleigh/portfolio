import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import NotFound from "./pages/+not-found";
import App from "./pages/App";
import Contact from "./pages/Contact";
import EasterEgg from "./pages/EasterEgg";
import Projects from "./pages/Projects";
import Stack from "./pages/Stack";

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <App />,
			},
			{
				path: "/projects",
				element: <Projects />,
			},
			{
				path: "/stack",
				element: <Stack />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
	{
		path: "/easter-egg",
		element: <EasterEgg />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
		<Analytics />
		<SpeedInsights />
	</StrictMode>,
);
