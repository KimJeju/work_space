import { Metadata } from "next"

export const metadata : Metadata = {
    title : "Not Found"
}

export default function NotFound() {
    return (
        <div>
            <h2>page not found</h2>
        </div>
        )
}