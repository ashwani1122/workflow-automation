import { ReactNode, MouseEvent } from 'react';
import Link from "next/link";
import { 
  AlertTriangleIcon, 
  Loader2Icon, 
  MoreVerticalIcon, 
  PackageOpenIcon, 
  PlusIcon, 
  SearchIcon, 
  TrashIcon 
} from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

/* -------------------------------------------------------------------------- */
/* Types & Props                               */
/* -------------------------------------------------------------------------- */

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel?: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

/* -------------------------------------------------------------------------- */
/* Components                                 */
/* -------------------------------------------------------------------------- */

export const EntityHeader = ({
  title,
  description,
  onNew,
  newButtonHref,
  newButtonLabel,
  disabled,
  isCreating,
}: EntityHeaderProps) => {
  const isLoading = isCreating || disabled;

  return (
    <div className="flex flex-row items-center justify-between gap-4 pb-2">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground/80 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      
      {(onNew || newButtonHref) && (
        <Button 
          disabled={isLoading} 
          size="sm" 
          variant="default"
          className="shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          asChild={!!newButtonHref}
          onClick={onNew}
        >
          {newButtonHref ? (
            <Link href={newButtonHref}>
              {isCreating ? <Loader2Icon className="mr-2 size-4 animate-spin" /> : <PlusIcon className="mr-2 size-4" />}
              {newButtonLabel || "Create New"}
            </Link>
          ) : (
            <>
              {isCreating ? <Loader2Icon className="mr-2 size-4 animate-spin" /> : <PlusIcon className="mr-2 size-4" />}
              {newButtonLabel || "Create New"}
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export const EntityContainer = ({
  children,
  header,
  search,
  pagination,
}: {
  children: ReactNode;
  header?: ReactNode;
  search?: ReactNode;
  pagination?: ReactNode;
}) => {
  return (
    <div className="flex flex-col h-full w-full max-w-screen-xl mx-auto p-6 md:p-8 lg:p-10 gap-y-8">
      {header && <div className="w-full">{header}</div>}
      <div className="flex flex-col gap-y-6 flex-1">
        {search && <div className="flex justify-end">{search}</div>}
        <div className="min-h-0 flex-1">{children}</div>
      </div>
      {pagination && <div className="pt-4 border-t border-border/40">{pagination}</div>}
    </div>
  );
};

export const EntitySearch = ({
  value,
  onChange,
  placeholder = "Search items...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  return (
    <div className="relative group w-full max-w-sm transition-all">
      <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <Input 
        className="h-10 bg-[#151515] border-border/50 pl-10 focus-visible:ring-primary/20 focus-visible:bg-background transition-all shadow-inner"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between w-full animate-in fade-in slide-in-from-bottom-2">
      <p className="text-sm font-medium text-muted-foreground">
        Showing page <span className="text-white font-semibold">{page}</span> of {totalPages || 1}
      </p>
      <div className="flex items-center gap-x-2">
        <Button
          disabled={page === 1 || disabled}
          variant="outline"
          size="sm"
          className="h-9 px-4"
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0 || disabled}
          variant="outline"
          size="sm"
          className="h-9 px-4"
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* State Views                                  */
/* -------------------------------------------------------------------------- */

export const LoadingView = ({ message = "Loading content..." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-20 animate-pulse">
    <div className="relative flex items-center justify-center">
      <Loader2Icon className="size-10 animate-spin text-primary/60" />
      <div className="absolute size-10 rounded-full border-2 border-primary/10" />
    </div>
    <p className="mt-4 text-sm font-medium text-muted-foreground/70 tracking-wide uppercase">
      {message}
    </p>
  </div>
);

export const ErrorView = ({ message = "Something went wrong" }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="bg-destructive/10 p-3 rounded-full mb-4">
      <AlertTriangleIcon className="size-8 text-destructive" />
    </div>
    <p className="text-balance text-muted-foreground max-w-[250px]">
      {message}
    </p>
  </div>
);

export const EmptyView = ({ message, onNew }: { message?: string; onNew?: () => void }) => (
  <Empty className="border-2 border-dashed bg-[#151515] border-border/50 py-12 rounded-xl">
    <EmptyHeader>
      <EmptyMedia variant="icon" className="bg-background shadow-sm border border-border">
        <PackageOpenIcon className="size-6 text-muted-foreground" />
      </EmptyMedia>
    </EmptyHeader>
    <EmptyTitle className="text-xl text-white">No items found</EmptyTitle>
    {message && <EmptyDescription>{message}</EmptyDescription>}
    {onNew && (
      <EmptyContent>
        <Button onClick={onNew} variant="outline" className="mt-2 group">
          <PlusIcon className="mr-2 size-4 group-hover:rotate-90 transition-transform" />
          Create your first item
        </Button>
      </EmptyContent>
    )}
  </Empty>
);

/* -------------------------------------------------------------------------- */
/* List & Item                                 */
/* -------------------------------------------------------------------------- */

export function EntityList<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: ReactNode;
  className?: string;
}) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex items-center justify-center min-h-[300px] animate-in  duration-500">
        <div className="w-full max-w-md">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 gap-4", className)}>
      {items.map((item, index) => (
        <div 
          key={getKey ? getKey(item, index) : index}
          className="animate-in fade-in slide-in-from-top-2 duration-300 fill-mode-both"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

export const EntityItem = ({
  href,
  title,
  subtitle,
  image,
  actions,
  onRemove,
  isRemoving,
  className,
}: {
  href: string;
  title: string;
  subtitle?: ReactNode;
  image?: ReactNode;
  actions?: ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
}) => {
  const handleRemove = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRemoving || !onRemove) return;
    await onRemove();
  };

  return (
    <Link href={href} prefetch className="group block outline-none">
      <Card
        className={cn(
          "relative overflow-hidden border-border/50 bg-[#151515] transition-all",
          "hover:bg-[#151500] hover:border-primary/30",
          "active:scale-[0.99] group-focus-visible:ring-2 ring-primary",
          isRemoving && "opacity-50 grayscale pointer-events-none",
          className,
        )}
      >
        <CardContent className="flex items-center justify-between p-4 gap-4">
          <div className="flex items-center gap-4 min-w-0">
            {image && (
              <div className="size-10 rounded-lg overflow-hidden bg-secondary flex items-center justify-center shrink-0 border border-border/50">
                {image}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <CardTitle className="text-sm md:text-base font-semibold truncate text-white">
                {title}
              </CardTitle>
              {subtitle && (
                <div className="text-xs text-muted-foreground truncate line-clamp-1">
                  {subtitle}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {actions}
            {onRemove && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                    onClick={(e) => e.stopPropagation()} 
                  >
                    <MoreVerticalIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem 
                    onClick={handleRemove} 
                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    <TrashIcon className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};