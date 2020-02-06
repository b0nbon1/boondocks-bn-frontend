import React from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import hotelPlaceholder from '../../assets/images/hotel-placeholder.png';
import LikeUnlike from './LikeUnlike';

function HotelCard({ data }) {
	const {
		image,
		name,
		// eslint-disable-next-line camelcase
		average_rating,
		description,
		id,
		likesCount,
		unLikesCount,
		likes,
		location,
	} = data;
	return (
		<div className='card hotel' data-testid='hotels'>
			<Link to={`/hotel/${id}`}>
				<div className='embed-responsive embed-responsive-16by9'>
					<img
						className='card-img-top img-fluid embed-responsive-item'
						src={image || hotelPlaceholder}
						alt='hotel'
					/>
				</div>
				<div className='card-body'>
					<div className='d-flex flex-column'>
						<h5 className='card-title mr-3 text-dark'>{name}</h5>
						<StarRatings
							rating={Number(average_rating)}
							starRatedColor='black'
							numberOfStars={5}
							starDimension='1rem'
							starSpacing='.1rem'
							name='rating'
						/>
					</div>
					<p className='card-text text-secondary hotelDescription'>
						{description}
					</p>
				</div>
			</Link>
			<div className='d-inline-block p-3'>
				<Link to={`/booking/${id}`} className='btn btn-primary text-white mr-2'>
					Book Now
				</Link>
				<div className='float-right'>
					<LikeUnlike
						id={id}
						likesCount={likesCount}
						unLikesCount={unLikesCount}
						likes={likes}
					/>
				</div>
			</div>
			<div className='card-footer bg-white text-muted'>
				Location:
				{` ${location.country}, ${location.city}.`}
			</div>
		</div>
	);
}

HotelCard.propTypes = {
	data: PropTypes.objectOf(PropTypes.any),
};

HotelCard.defaultProps = {
	data: null,
};

export default HotelCard;
