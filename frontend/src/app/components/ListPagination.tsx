import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from './ui/pagination';

type ListPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function formatPaginationRange(
  currentPage: number,
  pageSize: number,
  totalItems: number,
): string {
  if (totalItems <= 0) return '0 sur 0';
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  return `${start}–${end} sur ${totalItems}`;
}

export function ListPagination({
  currentPage,
  totalPages,
  onPageChange,
  className = 'mt-12',
}: ListPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Pagination className={className}>
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationLink
            href="#"
            size="default"
            aria-label="Page précédente"
            aria-disabled={currentPage <= 1}
            className={`gap-1 border border-transparent px-2.5 text-primary hover:border-secondary hover:bg-secondary/10 hover:text-primary sm:pl-2.5 ${
              currentPage <= 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'
            }`}
            onClick={(event) => {
              event.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:block">Précédent</span>
          </PaginationLink>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
          const isActive = page === currentPage;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={isActive}
                className={`cursor-pointer border font-semibold text-primary transition-colors ${
                  isActive
                    ? 'border-secondary bg-secondary/20 hover:bg-secondary/30 hover:text-primary'
                    : 'border-secondary/40 bg-white hover:border-secondary hover:bg-secondary/10 hover:text-primary'
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationLink
            href="#"
            size="default"
            aria-label="Page suivante"
            aria-disabled={currentPage >= totalPages}
            className={`gap-1 border border-transparent px-2.5 text-primary hover:border-secondary hover:bg-secondary/10 hover:text-primary sm:pr-2.5 ${
              currentPage >= totalPages
                ? 'pointer-events-none opacity-40'
                : 'cursor-pointer'
            }`}
            onClick={(event) => {
              event.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          >
            <span className="hidden sm:block">Suivant</span>
            <ChevronRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
