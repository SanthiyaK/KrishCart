export default function Footer () {
    const year = new Date();
    return(
        <footer class="py-1">
        <p class="text-center text-dark mt-1">
           Copyright &copy; {year.getFullYear()}, All Rights Reserved
        </p>
      </footer>

    )}
