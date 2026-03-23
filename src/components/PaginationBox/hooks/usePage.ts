import UserContext from "@/context/context"
import { useContext } from "react"

type usePageHandlerProps = {
  currentPage: number
  totalPages: number
}

const usePage = ({ currentPage, totalPages }: usePageHandlerProps) => {
  const { setCurrentPage, setNoOfRows } = useContext(UserContext)
  const getPages = ()=> {

  const pages: (number | "...")[] = []

  pages.push(1)

  if (currentPage > 3) {
    pages.push("...")
  }

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (currentPage < totalPages - 2) {
    pages.push("...")
  }

  if (totalPages > 1) {
    pages.push(totalPages)
  }
return pages
}

  const handleSelectChange = (value: string) => {
    setNoOfRows(Number(value))
    setCurrentPage(1)
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1)
    }
  }

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1)
    }
  }

  return { getPages, handleSelectChange, handleNextClick, handlePreviousClick }
}

export default usePage
