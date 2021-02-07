import './summary.css';

function Summary(props) {
    const {
        className,
        title,
        summaryText
     } = props;

    return (
        <div className={className}>
            <h1 className={`${className}__title`}>
                {`${title}`}
            </h1>
            <pre className={`${className}__summary-text`}>
                {summaryText}
            </pre>
        </div>
    );
}

Summary.defaultProps = {
    className: 'summary',
    title: 'Summary',
    summaryText: ''
  };

export default Summary;