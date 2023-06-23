Ela consiste em dividir o conteúdo entre componentes de apresentação (mais simples, que não possuem comportamento) e componentes contêiner ou inteligentes (que detêm informações e as enviam para outros componentes). Em inglês, chamamos ambos os tipos de dumb components e smart components, respectivamente.

--o abre o navegador

A programação reativa pode ser considerada um paradigma de programação ou modelo de arquitetura que se refere basicamente à manipulação de um fluxo de dados (streams) ou eventos de forma assíncrona.

RxJS - https://rxjs-dev.firebaseapp.com/


Observable - coleçaõde valore ou evenotos fuutos 

observer - ouvir os valore entregues pelo Observable

subiscribe faz com que o observer se incerve ao observable paar ele passar os dados para ele

mais de uma instrução par ao subcribe

metodos dentro do subscribe 
Next - pode ser emitido varias vezes
error - opcional - se der erro - uma vez
complete - opcional - Quando termina - uma vez
O padrão observer é a base da programação orientada a eventos ou pub/sub publication / subscription

desinscrever de um Observable - Unsubscribe

Boa pratica após realizar um subscribe realizar um Unsubscribe par anão ocupar memoria 

Interfazes podem ser varias ou todas em um arquivo
