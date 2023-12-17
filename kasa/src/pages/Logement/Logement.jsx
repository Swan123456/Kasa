import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Carrousel from "../../components/Slideshow/Slideshow";
import Collapse from "../../components/Collapse/Collapse";
import axios from "axios";

export default function Logement() {
	const params = useParams();
	const navigate = useNavigate();

	const [pickedAppart, setPickedAppart] = useState();
	useEffect(() => {
		const getData = async () => {
			const res = await axios.get("/logements.json"); //j'ai préféré utiliser une requète AXIOS pour être prêt à la future mise en place de l'API
			const picked = res.data.find(({ id }) => id === params.id);
			res.data.map(() => setPickedAppart(picked));
			if (picked === undefined) {
				navigate("/404", { state: { message: "Can't get data" } }); //renvoi vers la page 404 en cas d'URL de logement invalide
			}
		};
		getData();
	}, []); // array vide du useEffect pour ne lancer qu'une seule fois
	const slidePics = pickedAppart && pickedAppart.pictures;
	const equipments = pickedAppart && pickedAppart.equipments;
	const equip =
		pickedAppart &&
		equipments.map((item, index) => (
			<li key={index} className="equipList">
				{item}
			</li>
		));
	return (
		pickedAppart && (
			<div key={params.id} className="fiche-container">
				<Carrousel slides={slidePics} />
				<section className="hostInfo-container">

				</section>
				<div className="collapse-fiche-container">
					<Collapse
						aboutTitle="Description"
						aboutText={pickedAppart.description}
					/>
					<Collapse aboutTitle="Équipements" aboutText={equip} />
				</div>
			</div>
		)
	);
}
