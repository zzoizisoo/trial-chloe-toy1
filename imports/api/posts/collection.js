import { Mongo } from 'meteor/mongo';

export const PostsCollection = new Mongo.Collection('posts')

// const scheme = {
// _id
// title
// description
// imageUrl
// content
// createdBy
// viewCount
// createdAt
//   };


export const SamplePosts = [{
    title: '스마트링크 공지사항 입니다. 이 더미 텍스트를 통해 전체 제목의 길이에 대한 적정한 판단과 영역 세팅을 고민하게 됩니다. 굉장히 길고 복잡하게 느끼겠지만 테스트를 위해서는 이러한 더미 텍스트로 체크를 해보는 것이 필수 입니다. 참고 부탁드립니다.',
    description: '설명',
    imageUrl: 'image url',
    content: `예가 청춘의 귀는 붙잡아 아름답고 이상의 용감하고 쓸쓸하랴? 없으면, 아니한 심장은 있으며, 얼음에 사람은 일월과 것이다. 새 인간은 작고 속에 인간에 운다. 아니더면, 우는 인간이 그들의 우리는 가치를 관현악이며, 끓는다. 사는가 그들은 것은 쓸쓸한 위하여서 별과 아름다우냐? 무엇을 피어나기 못할 예수는 황금시대다. 같지 같으며, 우리의 두기 위하여 옷을 열락의 갑 모래뿐일 있다. 새 찾아 이상의 것이다.보라, 무엇을 든 봄바람이다. 인간의 위하여, 우리 인생을 보라. 끝에 이상의 앞이 가지에 이는 것은 청춘이 무한한 생생하며, 끓는다.

역사를 반짝이는 스며들어 원질이 인간의 말이다. 가는 얼음에 쓸쓸한 되는 사랑의 실현에 얼마나 물방아 이것이다. 끝에 바이며, 이 온갖 고행을 청춘의 남는 피가 우리 끓는다. 그들의 생생하며, 인생에 물방아 못하다 이상을 사막이다. 이상이 새 대한 꽃이 이것을 끓는 이것은 황금시대다. 구하지 가슴에 구하기 것이다. 같이, 가진 같이 것이다. 스며들어 고행을 가치를 크고 봄바람이다. 위하여서, 귀는 보이는 장식하는 인생에 인간은 생명을 같이 아름다우냐?

풍부하게 이상의 노년에게서 든 청춘의 따뜻한 것이다. 청춘의 사랑의 심장의 못할 운다. 노년에게서 같이, 피고 황금시대다. 그들은 따뜻한 꽃 사라지지 때에, 구하기 유소년에게서 가슴이 피다. 가치를 얼마나 새 위하여, 있는가? 어디 곧 대한 주는 것이다. 대중을 오직 앞이 노년에게서 것이다. 옷을 그림자는 사랑의 우리의 이 심장은 그들은 대고, 붙잡아 운다. 역사를 위하여서, 청춘의 이상 이것을 천고에 때에, 스며들어 꽃 위하여서. 인간에 수 과실이 옷을 커다란 긴지라 찬미를 속에서 이것이다.
`,
    createdBy: '...;;;',
    viewCount: 0,
    createdAt: Date.now(),
},
{
    title: '인간이 거선의 그들은 전인 곳으로 과실이 피부가 얼음과 말이다. 뭇 싹이 따뜻한 것이다. 만천하의 보내는 얼마나 피다. 청춘 같은 그것은 끝에 수 때문이다. 이상 귀는 남는 수 사는가 것이다. 위하여 인간의 노년에게서 뭇 이상의 끓는다. 이 꽃 때까지 말이다. 같은 그들의 인간의 때문이다. 예가 무엇을 피어나는 풀밭에 안고, 그들은 고행을 뛰노는 힘차게 있다.',
    description: '설명2',
    imageUrl: 'image url',
    content: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nunc ante, mattis vel dolor sed, ullamcorper sodales ligula. Sed non lorem id justo venenatis pulvinar sed vitae mauris. In hendrerit tempus arcu, sodales sodales ex tincidunt laoreet. Curabitur et dolor ipsum. Nullam sit amet laoreet ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur dignissim hendrerit consectetur. Praesent accumsan diam sed tortor mattis, sit amet fermentum diam placerat. Mauris id scelerisque justo, a pellentesque libero.

Etiam blandit bibendum erat et faucibus. Sed sed nisi semper, ultricies dolor sit amet, maximus nisi. Praesent sed efficitur ante. Aliquam nec ligula vehicula, cursus enim in, varius libero. Nullam non interdum tortor. Sed sed mi ut nulla ullamcorper viverra. Fusce nec tellus cursus, gravida lacus ac, molestie purus. Quisque ac nisi vel metus mattis pellentesque.

Vestibulum risus magna, suscipit aliquam luctus at, malesuada nec quam. Vestibulum iaculis odio eget tellus vestibulum varius. Aliquam tincidunt nisi ante, iaculis consectetur enim suscipit a. In congue velit non diam finibus, non mollis ex porta. Suspendisse eget diam risus. Sed condimentum eget elit ut tempor. Fusce ac est tempus, convallis tortor blandit, facilisis purus. Nam pellentesque volutpat commodo. Donec consectetur at lorem id tempor. Donec viverra vitae ante vitae aliquet. Mauris dolor sapien, porta in molestie id, lobortis at lorem. Vestibulum orci sapien, faucibus in neque ac, suscipit mattis ex. Suspendisse interdum dapibus diam, at convallis mauris consectetur sodales. Phasellus lobortis consequat mollis. Cras magna diam, hendrerit et aliquam eget, laoreet ut ante.`,
    createdBy: '...;;;',
    viewCount: 0,
    createdAt: Date.now(),
},
{
    title: 'Post 3',
    description: '설명2',
    imageUrl: 'image url',
    content: 'post content',
    createdBy: '...;;;',
    viewCount: 0,
    createdAt: Date.now(),
}]