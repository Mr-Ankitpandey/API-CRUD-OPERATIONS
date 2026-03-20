import type { userType } from "@/Types/types"
import { useMemo, useEffect, useContext } from "react"
import useDebounce from "./useDebounce"
import UserContext from "@/context/context"

type UsePaginationProps = {
  data: userType[]
  currentPage: number
  rowsPerPage: number
  setCurrentPage: (page: number) => void
}

const usePagination = ({
  data,
  currentPage,
  rowsPerPage,
  setCurrentPage,
}: UsePaginationProps) => {
  const { searchQuery } = useContext(UserContext)

  const debouncedSearch = useDebounce(searchQuery, 500)
  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return data

    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.city.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [data, debouncedSearch])

  const totalPages =  Math.ceil(filteredUsers.length / rowsPerPage)
  
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1)
    }
  }, [currentPage, totalPages, setCurrentPage])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredUsers.slice(start, start + rowsPerPage)
  }, [filteredUsers, currentPage, rowsPerPage])

  return {
    totalPages,
    paginatedData,
  }
}

export default usePagination
