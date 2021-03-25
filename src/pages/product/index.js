/** @format */

import React from 'react';
import { connect } from 'react-redux';
import './styles/product.scss';
import { getProduct } from '../../redux/actions/product/product.actions';
import { getTRL } from '../../redux/actions/Trl/trl.actions';
import { getConfig } from '../../redux/actions/config/config.actions';
import Attribute from './attribute';
import Map from '../../components/Map';

const product = {
	id: 6781,
	name: 'LoftOS',
	description:
		'Innoloft <b>creates</b> the leading B2B tech ecosystem through interconnected research & business networks and marketplaces. With our digital platform technology, we are changing the way business contacts are initiated between economic and innovation actors.\n\nOur unique software-as-a-service (SaaS) solution LoftOS digitizes services provided by governments and public economic agencies, clusters and hubs, as well as event organizers and trade shows. Not only can our LoftOS customers implement their digitization strategy in a matter of months - each platform can also be connected through our system and its data standard. Through this connection, Innoloft and its partners are creating the largest B2B tech ecosystem in the world.\nCompanies, startups, research institutes and other business players use the ecosystem for lead generation, innovation scouting, procurement or partner acquisition.\n',
	picture: 'https://img.innoloft.de/products/product_783016a3.png',
	type: {
		id: 2,
		name: 'Software',
	},
	categories: [
		{
			id: 5101,
			name: 'IT platforms',
		},
		{
			id: 5100,
			name: 'B2B marketplaces',
		},
	],
	implementationEffortText: null,
	investmentEffort: '< 25.000€',
	trl: {
		id: 9,
		name: 'TRL 9 – Actual system proven in operational environment (established product available)',
	},
	user: {
		id: 284,
		email: 'c.stirner@innoloft.com',
		firstName: 'Christopher',
		lastName: 'Stirner',
		sex: 1,
		profilePicture: 'https://img.innoloft.de/users/user_8b245d25.png',
		position: 'Chief Strategy Officer',
	},
	company: {
		name: 'Innoloft GmbH',
		logo: 'https://img.innoloft.de/logos/unt_7838d306.png',
		address: {
			id: null,
			country: {
				name: 'Deutschland',
				region: null,
			},
			state: null,
			city: {
				name: 'Aachen',
				countryId: null,
				stateId: null,
			},
			street: 'Jülicher Straße',
			house: '72a',
			zipCode: '52070',
			longitude: '6.100367',
			latitude: '50.779729',
			fallbackString: null,
			cityRegion: null,
		},
	},
	businessModels: [
		{
			id: 65,
			name: 'Pay-Per-Use',
		},
		{
			id: 1155,
			name: 'Subscription',
		},
		{
			id: 374,
			name: 'White-Label',
		},
		{
			id: 66,
			name: 'Peer-to-Peer (P2P)',
		},
	],
};

const Product = (props) => {
	const [activeTab, setActiveTab] = React.useState('description');
	const fetchProduct = async () => {
		return await props.getProduct();
	};


	const fetchTrl = async () => {
		return await props.getTRL()
	}

	const fetchConfig = async () => {
		return await props?.getConfig();
	}

	React.useEffect(() => {
		fetchProduct();
		fetchTrl();
		fetchConfig()
	}, []);

	console.log(props.config, 'config')

	return (
		<div className="product__wrapper">
			<div className="product__details">
				<div className="product__image">
					<img src={props?.product?.product?.picture} alt="product" />
				</div>
				<div className="product__main-info">
					<p>
						<strong>Product Title:</strong> {props?.product?.product.name}
					</p>
					<p>
						<strong>Product Type:</strong> {props?.product?.product?.type?.name}
					</p>
				</div>
				<div className="product__tabs">
					<button className={`${activeTab === 'description'}`} onClick={() => setActiveTab('description')}>
						Description
					</button>
					<button className={`${activeTab === 'attributes'}`} onClick={() => setActiveTab('attributes')}>
						Attributes
					</button>
				</div>

				<div className="tab__content">
					{activeTab === 'description' ? (
						<div>
							<h1>Product Description</h1>
							<p className="product__description"> {product?.description}</p>
						</div>
					) : (
						<Attribute product={props?.product?.product} trl={props?.trl} />
					)}
				</div>
			</div>

			<div className="user__details">
				{
					props?.config?.getConfigSuccess?.hasUserSection ? <div className="user__info">
						<img src={props?.product?.product?.user?.profilePicture} alt="user" />
						<p>
							{props?.product?.product?.user?.firstName} {props?.product?.product?.user?.lastName}
						</p>
						<p>{props?.product?.product?.company?.name}</p>
					</div> : null
				}

				<div className="map">
					<Map address={props?.product?.product?.company?.address} />
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	product: state.product,
	trl: state.trl,
	config: state.config
});

const mapDispatchToProps = {
	getProduct,
	getTRL,
	getConfig
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
