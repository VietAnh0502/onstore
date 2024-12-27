export default function Home({
    params,
} : {
    params: { productsId: string }
})  {
  return (
    <div>
        <h1> {params.productsId} </h1>
        <h1>Hello, Next.js!   </h1>
        <p>
            This is a simple example of a Next.js page. You can edit this page by
            modifying the code in the <code>pages/index.tsx</code> file.
        </p>
    </div>
  );
}