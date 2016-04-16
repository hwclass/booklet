/**
* Mock : The data mocking object
* @noparam
*/
var Mock = function () {

  /*
   *Setting for the context 'this' into another variable
   *@type {Mock}
   */
  var self = this;

  this.data = {
    currentHotel : {
      id : 68756432,
      name : 'Test Hotel',
      address : 'Beyoğlu İstanbul',
      starPoints : 4,
      images : [
        {src : 'https://www.booking.com/', altText : 'Test alt text 1'},
        {src : 'https://www.booking.com/', altText : 'Test alt text 2'}
      ],
      desc : 'Test description',
      facilities : {
        freeWiFi : true,
        swimmingPool : true,
        gym : true,
        concierge : true,
        restaurant : true,
        freeParking : true,
        satelliteTv : false,
        roomService : false
      },
      roomTypes : [
        {roomName : 'Basic 2 Bed', status : 'The last rooms is rented before 2 minutes!', alertLink : 'http://www.booking.com/alert/523244644', occupancy : 3, pricePerRoom : 66.66},
        {roomName : 'Basic Family Room', status : '-', occupancy : 1, pricePerRoom : 45.66},
        {roomName : 'Deluxe 2 Bed', status : 'We have a new deal for you!', dealLink : 'http://www.booking.com/deal/7838476843', occupancy : 2, pricePerRoom : 109.99},
        {roomName : 'Deluxe Family Room', status : '-', occupancy : 7, pricePerRoom : 112.99}
      ],
      reviews : [
        {
          score : 5,
          text : 'Pellentesque ligula nibh, lacinia eget pharetra ut, vulputate vitae odio. Donec non mattis nisi. Pellentesque elit leo, tincidunt nec felis vitae, aliquet imperdiet purus. In elit ante, vestibulum non accumsan at, volutpat eget dolor. Quisque ut tincidunt elit. Curabitur rutrum dignissim enim ac aliquet. Curabitur et aliquam nisl.',
          userName : 'Malcolm Reynolds'
        },
        {
          score : 8,
          text : 'Duis ac nisi id lorem rhoncus tempus eu sit amet nisi. Aenean ultrices congue ligula, ac molestie velit ultricies a. Nulla ac nunc et nisi placerat interdum sit amet ut erat. Integer vulputate nulla id orci cursus, eget ullamcorper justo ultricies. Nulla lorem dui, euismod non porttitor eu, sagittis in lacus. In suscipit lectus non viverra luctus. Pellentesque egestas, dolor at luctus eleifend, velit dui viverra risus, ac rutrum sapien ante at massa. Donec imperdiet consequat laoreet.',
          userName : 'Zoe Washburne'
        },
        {
          score : 3,
          text : 'Etiam posuere, magna sit amet ullamcorper auctor, odio urna tempor velit, sit amet tincidunt lorem diam a velit. Integer a dapibus nunc. In iaculis vel sem ut gravida.',
          userName : 'Hoban Washburne'
        },
        {
          score : 10,
          text : 'Etiam condimentum sodales dui in vestibulum. Vivamus euismod egestas porttitor. Proin dictum tempor euismod. Suspendisse elit nulla, elementum eu ornare in, tempus in massa. Proin elit sem, posuere nec tempor eget, suscipit sit amet dui. Aliquam in vehicula lorem. Praesent vitae vestibulum ante, nec vestibulum metus. Morbi commodo diam in leo semper ornare. Phasellus et diam magna.',
          userName : 'Inara Serra'
        },
        {
          score : 9,
          text : 'Maecenas cursus ut erat vitae vestibulum. Fusce feugiat dignissim augue consequat condimentum. Donec risus felis, ultricies a velit sed, varius ullamcorper enim. Suspendisse ultrices non tortor non lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          userName : 'Jayne Cobb'
        },
        {
          score : 4,
          text : 'Donec adipiscing lacus sed neque cursus ullamcorper. Vestibulum tellus lectus, molestie vitae augue et, egestas convallis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec porttitor mi vitae mauris aliquam, non accumsan odio tincidunt. Aliquam semper enim quam, ac cursus lectus dignissim vitae. Suspendisse nec rutrum ligula.',
          userName : 'Kaylee Frye'
        },
        {
          score : 7,
          text : 'Nullam et leo placerat lectus fringilla varius vel a lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nibh eros, blandit at aliquam eu, ullamcorper eu diam. Etiam id viverra lacus, rutrum suscipit nulla. Maecenas adipiscing, mi sit amet iaculis congue, urna massa vestibulum tortor, a tempus nibh tortor id dui.',
          userName : 'Simon Tam'
        },
        {
          score : 2,
          text : 'Maecenas semper, orci eget cursus aliquam, orci tellus sodales urna, nec varius nisi arcu gravida velit. Proin ultrices egestas nunc, eget dapibus erat sollicitudin in. Fusce fermentum dignissim ipsum sollicitudin tincidunt. Aliquam erat volutpat. Suspendisse in ornare ante.',
          userName : 'River Tam'
        },
        {
          score : 10,
          text : 'Nullam purus ante, rhoncus ac malesuada at, bibendum nec urna. Cras lobortis viverra feugiat. Praesent sapien elit, sagittis vel orci sed, congue consequat nulla.',
          userName : 'Derrial Book'
        },
        {
          score : 9,
          text : 'Donec malesuada semper lectus sed sagittis. Sed laoreet consectetur tortor, ac tempus ipsum malesuada non. Aenean dapibus leo sed sapien rhoncus, at dapibus ligula porta. Morbi tincidunt, urna eget ullamcorper aliquam, augue lectus placerat orci, tristique aliquet ipsum nisi id orci. Nulla vulputate lectus justo, eu dapibus lectus sodales ac. Donec volutpat nibh mi. Proin eu justo vitae dolor accumsan ultrices vel non ante.',
          userName : 'Sheriff Bourne'
        },
        {
          score : 3,
          text : 'Sed consectetur, lorem vitae laoreet tempus, neque elit fringilla nisl, nec tempus urna quam eu nulla. Nunc tempor nec magna vel viverra. In dapibus aliquam velit, ut malesuada nibh ornare eget. Suspendisse in risus posuere, hendrerit odio id, tincidunt lacus. Nunc fermentum metus sit amet mauris pellentesque, vitae sollicitudin dui facilisis. Etiam at velit id dolor rhoncus porttitor. Vestibulum quis blandit felis.',
          userName : 'Lawrance Dobson'
        },
        {
          score : 7,
          text : 'Suspendisse in risus posuere, hendrerit odio id, tincidunt lacus. Nunc fermentum metus sit amet mauris pellentesque, vitae sollicitudin dui facilisis. Etiam at velit id dolor rhoncus porttitor. Vestibulum quis blandit felis.',
          userName : 'Jubal Early'
        },
        {
          score : 8,
          text : 'Phasellus venenatis tortor ac lectus dapibus, sit amet pellentesque turpis mollis. Nam laoreet magna non leo facilisis auctor. Fusce neque augue, lobortis eget orci vel, lobortis porta lectus. Fusce venenatis, metus quis accumsan auctor, ipsum lectus volutpat tellus, viverra vulputate risus dolor porta lacus',
          userName : 'Fanty and Mingo'
        },
        {
          score : 1,
          text : 'Sed molestie ipsum ac diam feugiat tempus. Donec sed mi tortor. Donec dolor augue, tincidunt sed dignissim ac, congue ac sapien. Morbi molestie nibh eget neque rutrum tincidunt. Quisque adipiscing pulvinar massa eu laoreet. Aenean ipsum nisl, convallis eget tortor nec, convallis consequat tellus.',
          userName : 'Stitch Hessian'
        },
        {
          score : 10,
          text : 'Etiam porttitor ut massa sit amet pellentesque. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur facilisis commodo nulla ut laoreet. Integer vel felis sit amet dolor sollicitudin gravida. Nam quis congue lorem. Aenean quis purus leo. Nunc iaculis enim odio, eu feugiat augue porta sit amet. Fusce quis commodo nisl. Nunc laoreet leo vel egestas volutpat. Suspendisse et cursus leo.',
          userName : 'Fess Higgins'
        },
        {
          score : 9,
          text : 'Nunc vel suscipit mi. Morbi semper diam urna, sit amet elementum turpis egestas nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer aliquet mi at dui blandit accumsan. Aliquam laoreet enim vel volutpat fermentum. Etiam feugiat arcu mi, sed blandit magna dictum vitae. Ut tristique id nunc ut molestie. Curabitur et augue rhoncus, consectetur mauris vel, laoreet sapien.',
          userName : 'Magistrate Higgins'
        },
        {
          score : 6,
          text : 'Mauris in ligula quis orci auctor blandit. Maecenas venenatis quis mi vitae sagittis. Sed tincidunt laoreet mi nec ullamcorper. Pellentesque elementum ut lacus ac iaculis. Sed suscipit ipsum ut bibendum ullamcorper. Cras ac est risus. Praesent in risus velit. Donec placerat hendrerit nibh vitae auctor.',
          userName : 'Dr. Mathias'
        },
        {
          score : 8,
          text : 'Sed ut ipsum in tellus tristique venenatis quis sit amet nibh. Phasellus pretium eget est ac consequat. Vivamus accumsan semper dui, nec vestibulum mauris rutrum sollicitudin. Mauris quis lorem fermentum, dignissim eros faucibus, tempor justo. Donec nec interdum risus.',
          userName : 'Adelei Niska'
        },
        {
          score : 9,
          text : 'Sed felis erat, laoreet vitae tincidunt non, interdum et elit. Nunc sit amet malesuada lorem. Suspendisse sagittis nulla quis elit pulvinar accumsan. Sed massa nibh, consequat ut mi in, consectetur pharetra nisl. Proin adipiscing semper quam, eget vestibulum risus pharetra ut. Ut sed elit neque.',
          userName : 'Tracey Smith'
        },
        {
          score : 4,
          text : 'Nam sit amet elit in nibh faucibus bibendum sed quis metus. Vivamus aliquam orci sed porta rhoncus. Mauris aliquam purus ut gravida gravida. Mauris sit amet quam enim. Aenean fringilla sed ligula luctus adipiscing. Donec ac augue tortor. In ultricies luctus nulla.',
          userName : 'Atherton Wing'
        },
        {
          score : 3,
          text : 'Mauris id adipiscing justo, eget volutpat mauris. Sed lorem ligula, fermentum at interdum eu, pulvinar vel felis. Aliquam malesuada eros augue, at sollicitudin urna accumsan ultrices.',
          userName : 'Monty'
        },
        {
          score : 6,
          text : 'Sed urna est, sagittis eu ligula sit amet, pellentesque lacinia velit. Sed imperdiet enim non risus bibendum semper. Curabitur gravida consequat magna, nec lobortis elit pretium nec. Morbi eget lacus eget ipsum vehicula pharetra. Donec vehicula aliquam euismod. Nulla facilisi. Donec non est nec eros volutpat placerat in et massa.',
          userName : 'Lenore'
        },
        {
          score : 2,
          text : 'Aliquam scelerisque ullamcorper vehicula. Aenean ut aliquam mi, nec faucibus tortor. Aliquam erat volutpat. Pellentesque et pellentesque mi. Aenean sem neque, cursus lacinia lectus in, egestas aliquet lorem. Sed aliquam, dolor in hendrerit fringilla, dui arcu pulvinar orci, non suscipit urna nibh id odio.',
          userName : 'Mr. Universe'
        },
        {
          score : 8,
          text : 'Morbi vel nisi vel nibh rhoncus vestibulum non sagittis nisl. Curabitur varius dolor massa, ut pulvinar mauris blandit a. Phasellus vestibulum arcu turpis, ut consequat risus sagittis ut. Proin non elit sit amet magna lacinia molestie. Sed eget vulputate augue. In hac habitasse platea dictumst. Cras imperdiet leo nec ante dapibus, in mollis risus interdum. Nullam pharetra nibh eu diam tempus, eget lobortis metus vulputate.',
          userName : 'Sir Warwick Harrow'
        },
        {
          score : 9,
          text : 'Curabitur quis augue cursus, cursus massa ac, dapibus magna. Curabitur non sapien vel lorem pellentesque rhoncus. Nam sagittis, metus aliquet malesuada egestas, leo purus cursus turpis, tempor pharetra tellus nibh posuere turpis. Cras viverra, nisi eget ornare suscipit, erat velit facilisis elit, quis interdum justo magna a tortor. Donec condimentum quam id felis sollicitudin porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
          userName : 'Simon Tam'
        },
        {
          score : 10,
          text : 'Quisque eros sapien, tempus vel ullamcorper nec, faucibus eget ante. Curabitur vel velit ac libero tempus fringilla in dignissim ligula. Integer eget laoreet ligula, eget ultricies ligula. Donec convallis augue a dolor sagittis feugiat. Aliquam adipiscing, ipsum eget pulvinar pulvinar, elit nisl vestibulum ligula, id interdum felis sem quis mi. Sed vel leo nisl. Sed consequat pharetra diam, vitae ultrices augue varius ac.',
          userName : 'Dr. Caron'
        },
        {
          score : 8,
          text : 'Etiam elementum at est sit amet sagittis. Curabitur euismod tellus leo, vitae porta justo ultricies vitae. Aliquam posuere nunc sit amet mauris interdum lacinia',
          userName : 'Bridget'
        },
        {
          score : 7,
          text : 'Uspendisse mollis leo et nisl laoreet, a molestie justo consectetur. Aliquam et leo vulputate, tincidunt massa vel, volutpat leo. Suspendisse potenti.',
          userName : 'Bester'
        },
        {
          score : 8,
          text : 'non convallis enim porttitor. Nulla ut fermentum sem. Aliquam tincidunt, dui malesuada venenatis pulvinar, justo tellus tempus nulla, sit amet pretium orci metus sed purus. Phasellus lobortis cursus lacus vitae volutpat. Nulla at velit ut orci varius placerat. Aenean est elit, adipiscing et nunc varius, accumsan tempus magna. Donec consectetur orci nec mattis hendrerit.',
          userName : 'Badger'
        }
      ],
      similarHotels : [
        {
          name : 'Radisson1',
          address : 'Aksaray İstanbul',
          starPoints : 3.5,
          images : [
            {src : 'img/1_thumb.jpg', altText : 'Test alt text 1'}
          ],
          desc : 'Test description',
          facilities : {
            freeWiFi : true,
            swimmingPool : true,
            gym : true,
            concierge : true,
            restaurant : true,
            freeParking : true,
            satelliteTv : false,
            roomService : false
          },
          roomTypes : [
            {roomName : 'Basic 2 Bed', occupancy : 3, pricePerRoom : 66.66},
            {roomName : 'Basic Family Room', occupancy : 1, pricePerRoom : 45.66}
          ],
          reviews : [
            {point : 4, ratingText : 'Lorem ipsum dolor', userName : 'Takinardi Torrichelli'},
            {point : 8, ratingText : 'Sid amed', userName : 'Pessotto İnzaghi'}
          ],
          premium : false,
          link : 'https://www.booking.com/hotel/352466346'
        },
        {
          name : 'Radisson2',
          address : 'Beyoğlu İstanbul',
          starPoints : 4,
          images : [
            {src : 'img/1_thumb.jpg', altText : 'Test alt text 1'},
          ],
          desc : 'Test description',
          facilities : {
            freeWiFi : true,
            swimmingPool : true,
            gym : true,
            concierge : true,
            restaurant : true,
            freeParking : true,
            satelliteTv : false,
            roomService : false
          },
          roomTypes : [
            {roomName : 'Basic 2 Bed', occupancy : 3, pricePerRoom : 66.66},
            {roomName : 'Basic Family Room', occupancy : 1, pricePerRoom : 45.66}
          ],
          reviews : [
            {point : 4, ratingText : 'Lorem ipsum dolor', userName : 'Takinardi Torrichelli'},
            {point : 8, ratingText : 'Sid amed', userName : 'Pessotto İnzaghi'}
          ],
          premium : true,
          link : 'https://www.booking.com/hotel/755573457'
        },
        {
          name : 'Radisson3',
          address : 'Beyoğlu İstanbul',
          starPoints : 4,
          images : [
            {src : 'img/1_thumb.jpg', altText : 'Test alt text 1'},
          ],
          desc : 'Test description',
          facilities : {
            freeWiFi : true,
            swimmingPool : true,
            gym : true,
            concierge : true,
            restaurant : true,
            freeParking : true,
            satelliteTv : false,
            roomService : false
          },
          roomTypes : [
            {roomName : 'Basic 2 Bed', occupancy : 3, pricePerRoom : 66.66},
            {roomName : 'Basic Family Room', occupancy : 1, pricePerRoom : 45.66}
          ],
          reviews : [
            {point : 4, ratingText : 'Lorem ipsum dolor', userName : 'Takinardi Torrichelli'},
            {point : 8, ratingText : 'Sid amed', userName : 'Pessotto İnzaghi'}
          ],
          premium : true,
          link : 'https://www.booking.com/hotel/956343464'
        },
        {
          name : 'Radisson4',
          address : 'Beyoğlu İstanbul',
          starPoints : 4,
          images : [
            {src : 'img/1_thumb.jpg', altText : 'Test alt text 1'},
          ],
          desc : 'Test description',
          facilities : {
            freeWiFi : true,
            swimmingPool : true,
            gym : true,
            concierge : true,
            restaurant : true,
            freeParking : true,
            satelliteTv : false,
            roomService : false
          },
          roomTypes : [
            {roomName : 'Basic 2 Bed', occupancy : 3, pricePerRoom : 66.66},
            {roomName : 'Basic Family Room', occupancy : 1, pricePerRoom : 45.66}
          ],
          reviews : [
            {point : 4, ratingText : 'Lorem ipsum dolor', userName : 'Takinardi Torrichelli'},
            {point : 8, ratingText : 'Sid amed', userName : 'Pessotto İnzaghi'}
          ],
          premium : true,
          link : 'https://www.booking.com/hotel/636456476'
        }
      ]
    }
  };

  /**
  * getData() is a getter for mock data
  *
  * @param {string} key
  */
  this.getData = function (key) {
    return self.data[key];
  }

}