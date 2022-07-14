import type { NextPage } from "next";
import Link from "next/link";

const DocumentPage:NextPage = () => {
    return (
        <div>
            <div className="DocumentationHeader">
                <Link href="/">
                    <h1> Home </h1>
                </Link>
            </div>

            <h2> How to Use </h2>

            <style>
            {`
            .DocumentationHeader:hover {
              text-shadow: 0 0 5px yellow;
              cursor: pointer;
            }
            `}
          </style>
        </div>
    )
}

export default DocumentPage
