import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {useGetInboxByIdQuery} from "../../services/show.mail.service";
import ApplicationLogo from "../../components/UI/ApplicationLogo";
import dateFormatter from "../../helpers/dateFormatter";
import Loader from "../../components/UI/Loader";

const Index = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(true);
    const mailId = location.pathname.replace(/\/show\//, "");
    const {data, isLoading, isError, refetch} = useGetInboxByIdQuery(mailId);


    if (isLoading) {
        return <Loader/>
    }
    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <div className="">
                    <div className="flex flex-row">
                        <ApplicationLogo className={"h-12 w-auto"}/>
                        <div className={"flex flex-col"}>
                           <span className={"text-xl"}>
                               {data.from_user.full_name}
                           </span>
                            <span className={"text-sm"}>
                               {data.from_user.region}
                           </span>
                        </div>
                    </div>
                </div>
                <span
                    className={`${
                        data.document.type === 'Министерства и Ведомства'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                            : data.document.type === 'Внутренные'
                                ? 'bg-gradient-to-r from-slate-500 from-10% to-slate-700 text-white'
                                : data.document.type === 'Правительственные'
                                    ? 'bg-gradient-to-r from-pink-500 from-10% to-red-500 text-white'
                                    : data.document.type === 'Гузориш'
                                        ? 'bg-gradient-to-r from-orange-500 from-10% to-amber-500 text-white'
                                        : 'bg-gray-500'
                    } text-slate-950 px-4 py-2 rounded`}
                >
                   {data.document.type}
               </span>
                <div className="items-end">
                    {dateFormatter(data.created_at)}
                </div>
            </div>
            <div className={"mt-10"}>
                <h3 className={"text-3xl"}>
                    {data.document.title}
                </h3>
            </div>
            <span>
                <div dangerouslySetInnerHTML={{__html: data.document.content}}></div>
            </span>
            <hr className={"divide-y-4 divide-amber-500"}/>
            <div>
                {
                    data.document.file.length >= 1 ?
                        <>
                            <div className="flex flex-row justify-between">
                                <div>
                                    count attachment
                                </div>
                                <div>
                                    download all
                                </div>
                            </div>
                            <div className="flex flex-row mt-10">
                                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam aspernatur
                                    consectetur
                                    eligendi enim facere fugiat illum, ipsam iusto magnam mollitia nihil odio omnis
                                    rerum sapiente
                                    similique sit vitae voluptatibus.
                                </div>
                                <div>Culpa ex odio optio quis saepe? A, eum fugiat id illo labore officiis quae
                                    quibusdam ratione.
                                    Accusamus assumenda cumque delectus odit voluptates. Amet consectetur cum impedit,
                                    ipsum quia
                                    ullam voluptates.
                                </div>
                                <div>Ad adipisci, autem obcaecati perferendis praesentium quibusdam quo tempora. Amet
                                    autem commodi
                                    consequatur consequuntur deleniti dolorum eius eligendi enim labore minus quae quo
                                    reiciendis,
                                    repellat sapiente sed velit vero voluptatem?
                                </div>
                                <div>A adipisci atque beatae culpa cum, cumque enim est exercitationem id labore magnam
                                    minus
                                    mollitia nam necessitatibus nesciunt nulla obcaecati officiis perspiciatis provident
                                    qui quis
                                    quod quos sunt tempore unde.
                                </div>
                                <div>Amet dolore ea eius nostrum perferendis suscipit vero. Asperiores cumque delectus
                                    dolorum esse
                                    eveniet ipsum necessitatibus non nostrum qui quos tempora tenetur, totam veritatis?
                                    Ducimus
                                    facilis hic in provident veniam!
                                </div>
                            </div>
                        </>
                        :
                        null

                }

            </div>
            <div className={"mt-10 border-t"}>
                reply
            </div>
        </div>
    );
};

export default Index;