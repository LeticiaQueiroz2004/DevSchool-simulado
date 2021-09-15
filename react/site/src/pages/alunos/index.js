
import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import React, { useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import { Container, Conteudo } from './styled'

import { useEffect, useState } from 'react';

import Api from '../../service/api';
const api = new Api();

export default function Index() {
  
    const loading = useRef(null);

    const [ produtos, setProdutos] = useState([]);
    const [ nome, setNome] = useState('');
    const [ categoria, setcategoria] = useState('');
    const [ precoDE, setPrecoDE] = useState('');
    const [ precoPOR, setPrecoPOR] = useState('');
    const [ avaliacao, setAvaliacao] = useState('');
    const [ estoque, setEstoque] = useState('');
    const [ descricao, setDescricao] = useState('');
    const [ linkIMG, setLinkIMG] = useState('');
    const [ idAlterando, setIdAlterando] = useState(0);

    async function listar() {
        loading.current.continuousStart();
        
        let r = await api.listar();
        setProdutos(r);

        loading.current.complete();

    }

    async function inserir() {
         if (nome == null || nome == '' )
        {
            toast.error('😬 Por favor, Informe o nome do produto!')
            return
        }  else if (categoria == null || categoria == '') {
            toast.error('😬 Por favor, Informe a categoria do produto!')
            return
        } else if (isNaN(avaliacao)) {
            toast.error('😬 A avaliação do produto requer apenas números')
            return
        } else if (avaliacao <= 0) {
            toast.error('😬 A avaliação do produto só pode ser positiva')
            return
        } else if (isNaN(precoDE) || isNaN(precoPOR)) {
            toast.error('😬 Os preços do produto requer apenas números')
            return
        } else if (avaliacao <= 0) {
            toast.error('😬 Os preços do produto só pode ser positivo')
            return
        } 
        else {

            if (idAlterando == 0) {
                let r = await api.inserir(nome, categoria, precoDE, precoPOR, avaliacao, descricao, estoque, linkIMG)
                
                if (r.erro)
                    toast.error(r.erro)
                else toast.dark('💕 Produto inserido!')            
            } else {
                let r = await api.alterar(idAlterando, nome, categoria, precoDE, precoPOR, avaliacao, descricao, estoque, linkIMG)
                    toast.dark(' 💕 Produto alterado!')
            }

        }
        limparCampos()
        listar()
    }
    
    function limparCampos() {
        setNome('');
        setcategoria('');
        setAvaliacao('');
        setPrecoDE('');
        setPrecoPOR('');
        setEstoque('');
        setDescricao('');
        setLinkIMG('');
        setIdAlterando(0);
    }

    async function editar (item) {
        setNome(item.nm_produto);
        setcategoria(item.ds_categoria);
        setAvaliacao(item.vl_avaliacao);
        setPrecoPOR(item.vl_preco_por);
        setEstoque(item.qtd_estoque);
        setDescricao(item.ds_produto);
        setLinkIMG(item.img_produto);
        setPrecoDE(item.vl_preco_de);
        setIdAlterando(item.id_produto);
    }

    function remover(id) {
        confirmAlert({
            title: 'Remover Produto',
            message: `Tem certeza que deseja remover o produto ${id} ?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        let r = await api.remover(id);
                        console.log(r)
                        if (r.erro)
                            toast.error(`${r.erro}`);
                        else{
                            toast.dark('😬 Produto removido!');
                            listar();
                        }
                    }
                },
                {
                    label: 'Não'
                }
            ]
        });
    }

    useEffect(() => {
        listar();
    }, [])

   

    return (
        <Container>
            <ToastContainer/>
            <LoadingBar color="#119FDC" ref={loading} />
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div class="body-right-box">
                    <div class="new-student-box">
                        
                        <div class="text-new-student">
                            <div class="bar-new-student"></div>
                            <div class="text-new-student"> Novo Produto </div>
                        </div>

                        <div class="input-new-student"> 
                            <div class="input-left">
                                <div class="agp-input"> 
                                    <div class="title-input"> Nome: </div>  
                                    <div class="input"> <input type="text" value={nome}  onChange={e => setNome(e.target.value)} /> </div>  
                                </div> 
                                <div class="agp-input">
                                    <div class="title-input"> Categoria: </div>  
                                    <div class="input"> <input type="text" value={categoria}  onChange={e => setcategoria(e.target.value)} /> </div> 
                                </div>
                                <div class="agp-input">
                                    <div class="title-input"> Avaliação: </div>  
                                    <div class="input"> <input type="text" value={avaliacao}  onChange={e => setAvaliacao(e.target.value)}/> </div> 
                                </div>
                            </div>

                            <div class="input-right">
                                <div class="agp-input">
                                    <div class="title-input"> Preço DE: </div>  
                                    <div class="input"> <input type="text" value={precoDE}  onChange={e => setPrecoDE(e.target.value)} /> </div>  
                                </div>
                                <div class="agp-input">
                                    <div class="title-input"> Preço POR: </div>  
                                    <div class="input"> <input type="text" value={precoPOR}  onChange={e => setPrecoPOR(e.target.value)}/> </div> 
                                </div>
                                <div class="agp-input">
                                    <div class="title-input"> Estoque: </div>  
                                    <div class="input"> <input type="text" value={estoque}  onChange={e => setEstoque(e.target.value)}/> </div> 
                                </div>
                            </div>
                        </div>
                        <div class="agp-input">
                            <div class="title-input"> Link Imagem: </div>  
                            <div class="link-img"> <input type="text" value={linkIMG}  onChange={e => setLinkIMG(e.target.value)}/> </div>
                        </div>
                        <div class="agp-input">
                            <div class="title-input"> Descrição: </div>  
                            <div class="description-product"> <textarea rows='7' cols='93' value={descricao}  onChange={e => setDescricao(e.target.value)}/> </div>
                            <div class="button-create"> <button onClick={inserir}> {idAlterando == 0 ? "Cadastrar" : "Alterar" } </button> </div>
                        </div>
                    </div>

                    <div class="student-registered-box">
                        <div class="row-bar"> 
                            <div class="bar-new-student"> </div>
                            <div class="text-registered-student"> Produtos Matriculados </div>
                        </div>
                    
                        <table class ="table-user">
                            <thead>
                                <tr>
                                    <th>  </th>
                                    <th> ID </th>
                                    <th> Produto </th>
                                    <th> Categoria </th>
                                    <th> Preço </th>
                                    <th> Estoque </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>
                                </tr>
                            </thead>
                    
                            <tbody>

                                {produtos.map((item, i) => 

                                    <tr className={ i % 2 == 0 ? "linha-alternada" : "" }>
                                        <td> <img src={item.img_produto} alt="" width="30px"/> </td>
                                        <td> {item.id_produto} </td>
                                        <td titlle={item.nm_produto != null && item.nm_produto.length >= 25 ?item.nm_produto : ''}> 
                                            {item.nm_produto != null && item.nm_produto.length >= 25 ? item.nm_produto.substr(0, 25) + '...' : item.nm_produto} 
                                        </td>
                                        <td> {item.ds_categoria} </td>
                                        <td> {item.vl_preco_por} </td>
                                        <td> {item.qtd_estoque} </td>
                                        <td class="coluna-acao"> <button onClick={() => editar(item) }> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                        <td class="coluna-acao"> <button onClick={() => remover(item.id_produto) }> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                    </tr>

                                )}
                                
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}
