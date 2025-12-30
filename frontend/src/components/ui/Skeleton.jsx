import PropTypes from 'prop-types';

const Skeleton = ({ className, width, height, rounded = 'rounded-lg' }) => {
    return (
        <div
            className={`animate-pulse bg-gray-200 ${rounded} ${className}`}
            style={{ width, height }}
        ></div>
    );
};

Skeleton.propTypes = {
    className: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rounded: PropTypes.string
};

export default Skeleton;
