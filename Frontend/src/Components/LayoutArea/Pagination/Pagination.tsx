
const Pagination: React.FC<{ totalVacations: number, vacationsPerPage: any, currentPage: number, setCurrentPage: any }> = ({ totalVacations, vacationsPerPage, currentPage, setCurrentPage }) => {
    const pages = [];

    for (let i = 1; i <= Math.ceil(totalVacations / vacationsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='Pagination'>
            {pages.map(number => (

                <button className="PaginationBtn" key={number} onClick={() => setCurrentPage(number)}>
                    {number}
                </button>
            ))}
        </div>
    );
}

export default Pagination;