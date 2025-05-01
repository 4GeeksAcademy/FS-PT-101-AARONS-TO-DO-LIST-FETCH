import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { TaskList } from "./TaskList";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="display-2 fw-bold mb-5">TO DO LIST</h1>
			<TaskList/>
		</div>
	);
};

export default Home;