import { SearchFormContainer } from "./styles";
import { MagnifyingGlass } from 'phosphor-react' 
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContexts";

const searchFormSchema = z.object({
    query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm(){

    const { fetchTransactions } = useContext(TransactionsContext)

    const { register, handleSubmit, formState: {isSubmitting} } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransactions(data: SearchFormInputs){
        await fetchTransactions(data.query)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input type="text" placeholder="Pesquisar transações" {...register('query')} />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}