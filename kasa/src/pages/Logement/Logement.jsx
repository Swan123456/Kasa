import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Carrousel from "../../components/Slideshow/Slideshow";
import Collapse from "../../components/Collapse/Collapse";
import axios from "axios";
import Host from "../../components/Host/Host";
import Rate from "../../components/Rate/Rate";
import Tag from "../../components/Tag/Tag";
import Loader from "../../components/Loader/Loader";

export default function Logement() {
	const params = useParams();
	const navigate = useNavigate();

	const [pickedAppart, setPickedAppart] = useState();
	const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const getData = async () => {
            try {
				await new Promise(resolve => setTimeout(resolve, 500));

                const res = await axios.get("/logements.json");
                const picked = res.data.find(({ id }) => id === params.id);
                setPickedAppart(picked);
                setLoading(false);
                if (picked === undefined) {
                    navigate("/404", { state: { message: "Can't get data" } });
                }
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
                setLoading(false);
                navigate("/404", { state: { message: "Error loading data" } });
            }
        };
		
        getData();
    }, [params.id, navigate]);
	
	if (loading) {
		return <Loader />;
	}

	const slidePics = pickedAppart && pickedAppart.pictures;
	const tags = pickedAppart && pickedAppart.tags;
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
				<section className="hostInfo-container">
					<div className="title-tags-container">
						<div className="title-container redFont">
							<h1>{pickedAppart.title}</h1>
							<h3>{pickedAppart.location}</h3>
						</div>
						<div className="tags-container">
							{tags.map((tag) => (
								<Tag key={tag} tag={tag} />
							))}
						</div>
					</div>
					<div className="rate-host-container">
						<div className="host-container redFont">
							<Host
								hostName={pickedAppart.host.name}
								hostPic={pickedAppart.host.picture}
							/>
						</div>
						<div className="rate-container">
							<Rate score={pickedAppart.rating} />
						</div>
					</div>
				</section>
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
