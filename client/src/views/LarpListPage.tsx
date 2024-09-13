import { Formik } from "formik";
import LarpList from "../components/Events/LarpList";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useFetchLarps } from "../hooks/useFetchLarps";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LarpQuery } from "../types";
import FilterLarpSchema from "../components/Forms/FilterLarpSchema";
import FilterLarpsForm from "../components/Forms/FilterLarpsForm";
import { base64Decode, base64Encode } from "../util/utilities";

function LarpListPage() {

    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("q") || null;
    const navigate = useNavigate();

    const { larps, loading, error } = useFetchLarps(queryParam);

    function setFilters(filterFormData: LarpQuery) {

        //remove empty entries
        for (const key in filterFormData) {
            const typedKey = key as keyof LarpQuery;
            if (filterFormData[typedKey] === "") {
                delete filterFormData[typedKey];
            }
        }

        //encode values for query
        const query = base64Encode(JSON.stringify(filterFormData));
        navigate(`/events/?q=${query}`);
    }


    const initialFormValues:LarpQuery = (function () {
        const queryObj:LarpQuery = queryParam ? JSON.parse(base64Decode(queryParam)):{}
        return {
            term: queryObj.term || "",
            title: queryObj.title || "",
            ticketStatus: queryObj.ticketStatus || "",
            tags: queryObj.tags || "",
            startBefore: queryObj.startBefore || "",
            startAfter: queryObj.startAfter || "",
            endBefore: queryObj.endBefore || "",
            endAfter: queryObj.endAfter || "",
            city: queryObj.city || "",
            country: queryObj.country || "",
            language: queryObj.language || "",
            org: queryObj.org || "",
        }
    }());

    return (
        loading
            ?
            <LoadingSpinner />
            :
            <>
                <ErrorMessage
                    title="Sorry, there was a problem fetching records for this page"
                    errs={error}
                />
                <Formik
                    onSubmit={(values) => setFilters(values)}
                    initialValues={initialFormValues}
                    validationSchema={FilterLarpSchema}
                >
                    <FilterLarpsForm />
                </Formik>

                <LarpList larps={larps} />
            </>

    );
}

export default LarpListPage;