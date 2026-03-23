import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import UserContext from "@/context/context"
import { useContext } from "react"
import { Button } from "../ui/button"
import usePagination from "@/hooks/usePagination"
import usePage from "./hooks/usePage"

export function PaginationBox() {
  const { noOfRows, currentPage, setCurrentPage, usersData } =
    useContext(UserContext)

  const { totalPages } = usePagination({
    data: usersData,
    currentPage,
    rowsPerPage: noOfRows,
    setCurrentPage,
  })

  const {getPages, handleNextClick, handlePreviousClick, handleSelectChange} = usePage({ currentPage, totalPages })
  const pages = getPages()


 
  return (
    <>
      {totalPages > 0 && (
        <div className="flex w-full md:items-center bg-gray-100 py-4">
          <div className="md:flex-1" />

          <div className="flex flex-1 justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="secondary"
                    disabled={currentPage === 1}
                    onClick={handlePreviousClick}
                  >
                    Previous
                  </Button>
                </PaginationItem>
                <div className="flex">
                  {pages?.map((page) => {
                    if (page === "...") {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          className={
                            currentPage === page
                              ? "bg-black text-white hover:bg-gray-700 hover:text-white cursor-pointer"
                              : "cursor-pointer"
                          }
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}
                </div>
                <PaginationItem onClick={handleNextClick}>
                  <Button
                    variant="secondary"
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <div className="flex flex-1 items-center justify-end md:gap-4 gap-1 pr-4">
            <label htmlFor="row-select" className="text-[12px] md:text-[16px] ">Select no. of rows</label>
            <Select value={String(noOfRows)} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-20" id="select-rows-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </>
  )
}
