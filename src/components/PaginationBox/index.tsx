import {
  Pagination,
  PaginationContent,
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

export function PaginationBox() {
  const { usersData, noOfRows, setNoOfRows, setCurrentPage } =
    useContext(UserContext)

  const TOTAL_PAGES = Math.ceil(usersData?.length / noOfRows)

  const handleSelectChange = (value: string) => {
    setNoOfRows(Number(value))
    setCurrentPage(1)
  }

  const handlePageChange = (
    e: React.MouseEventHandler<HTMLAnchorElement> | undefined
  ) => {
    setCurrentPage(e.target.text)
  }

  return (
    <div className="flex w-full items-center bg-gray-100 py-4">
      <div className="flex-1" />

      <div className="flex flex-1 justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {[...Array(TOTAL_PAGES).keys()].map((pageNo) => (
                <PaginationLink
                  key={pageNo}
                  href="#"
                  className="mr-2 border-black px-2 py-2"
                  onClick={handlePageChange}
                >
                  {pageNo + 1}
                </PaginationLink>
              ))}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4 pr-4">
        <label htmlFor="row-select">Select no. of rows</label>
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
  )
}
