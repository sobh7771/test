import React, { useState } from "react";
import { useMutation } from "react-query";
import { request, gql } from "graphql-request";
import axios from "axios";
require("dotenv").parse("../.env");

const { CLOUD_NAME, UPLOAD_PRESET } = process.env;

function FileUpload() {
	const [file, setFile] = useState(null);
	const [imgSrc, setImgSrc] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const fd = new FormData();

		fd.append("file", file);
		fd.append("upload_preset", UPLOAD_PRESET);

		const res = await axios.post(
			`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
			fd
		);

		setImgSrc(res.data.secure_url);
	};

	const handleChange = (e) => {
		setFile(e.target.files[0]);
	};

	return (
		<>
			<img src={imgSrc} />
			<form onSubmit={handleSubmit}>
				<input type="file" accept="image/jpg,png" onChange={handleChange} />
				<button>UPLOAD IMAGE</button>
			</form>
		</>
	);
}

function App() {
	return (
		<>
			<FileUpload />
		</>
	);
}

export default App;
