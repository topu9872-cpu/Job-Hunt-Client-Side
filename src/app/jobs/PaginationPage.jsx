"use client";
import { Pagination } from "@heroui/react";
import { useRouter } from "next/navigation";

const PaginationPage = ({page,totalPages, search}) => {
 const router=useRouter()
 const crruntPage=Number(page)
 const handleChange=(newPage)=>{
const url=search? `/jobs?page=${newPage}&search=${search}`:`/jobs?page=${newPage}`
router.push(url)
 }

  return (
    <div>
      <Pagination
     
       className="justify-center">
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={crruntPage === 1}
              onPress={() => handleChange(crruntPage- 1)}
            >
              <Pagination.PreviousIcon />
              <span>Previous</span>
            </Pagination.Previous>
          </Pagination.Item>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === crruntPage}
                onPress={() => handleChange(p)}
                className={p === crruntPage && "bg-info text-white"}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ))}
          <Pagination.Item>
            <Pagination.Next
              isDisabled={crruntPage === totalPages}
              onPress={() => handleChange(crruntPage + 1)}
            >
              <span>Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
};

export default PaginationPage;
