import "./Pagination.css";

const Pagination: React.FC<{
    vacationsPerPage: number;
    totalVacations: number;
    currentPage: number;
    setCurrentPage: (newPage: number) => void;
}> = ({ vacationsPerPage, totalVacations, currentPage, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalVacations / vacationsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (number: number) => {
        setCurrentPage(number);
        window.scrollTo(0, 0); // Scroll to top of page
    };

    return (
        <div className="Pagination">
            {pageNumbers.map((number) => (
                <button
                    className="page-link"
                    key={number}
                    onClick={() => handleClick(number)}
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;